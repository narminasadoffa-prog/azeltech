# FTP Upload Script for azeltech.az
# PowerShell script to upload project files to FTP server

$ftpHost = "azeltech.az"
$ftpPort = 21
$ftpUsername = "azeltech"
$ftpPassword = "AzelTech2025@!"
$ftpPath = "/"

# Local project path
$localPath = "C:\Users\user\Desktop\New folder\website\azel-build-pro"

# Files and folders to upload (excluding node_modules, .git, etc.)
$filesToUpload = @(
    "dist",
    "server",
    "prisma",
    "public",
    "package.json",
    "package-lock.json",
    "ecosystem.config.js",
    "Dockerfile",
    ".dockerignore",
    "coolify.yml",
    "nginx.conf"
)

Write-Host "🚀 Starting FTP upload to $ftpHost..." -ForegroundColor Green

# Create FTP request
function Upload-File {
    param(
        [string]$localFile,
        [string]$remotePath
    )
    
    try {
        $ftpUri = "ftp://$ftpHost$remotePath"
        $ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUri)
        $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($ftpUsername, $ftpPassword)
        $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $ftpRequest.UseBinary = $true
        $ftpRequest.UsePassive = $true
        
        $fileContent = [System.IO.File]::ReadAllBytes($localFile)
        $ftpRequest.ContentLength = $fileContent.Length
        
        $requestStream = $ftpRequest.GetRequestStream()
        $requestStream.Write($fileContent, 0, $fileContent.Length)
        $requestStream.Close()
        
        $response = $ftpRequest.GetResponse()
        Write-Host "✅ Uploaded: $remotePath" -ForegroundColor Green
        $response.Close()
    }
    catch {
        Write-Host "❌ Error uploading $remotePath : $_" -ForegroundColor Red
    }
}

function Upload-Directory {
    param(
        [string]$localDir,
        [string]$remoteDir
    )
    
    try {
        # Create remote directory
        $ftpUri = "ftp://$ftpHost$remoteDir"
        $ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUri)
        $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($ftpUsername, $ftpPassword)
        $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
        $ftpRequest.UsePassive = $true
        
        try {
            $response = $ftpRequest.GetResponse()
            Write-Host "📁 Created directory: $remoteDir" -ForegroundColor Cyan
            $response.Close()
        }
        catch {
            # Directory might already exist
        }
        
        # Upload files in directory
        $files = Get-ChildItem -Path $localDir -File
        foreach ($file in $files) {
            $remoteFilePath = "$remoteDir/$($file.Name)"
            Upload-File -localFile $file.FullName -remotePath $remoteFilePath
        }
        
        # Recursively upload subdirectories
        $subDirs = Get-ChildItem -Path $localDir -Directory
        foreach ($subDir in $subDirs) {
            $remoteSubDir = "$remoteDir/$($subDir.Name)"
            Upload-Directory -localDir $subDir.FullName -remoteDir $remoteSubDir
        }
    }
    catch {
        Write-Host "❌ Error uploading directory $remoteDir : $_" -ForegroundColor Red
    }
}

# Upload files
foreach ($item in $filesToUpload) {
    $localItemPath = Join-Path $localPath $item
    
    if (Test-Path $localItemPath) {
        if (Test-Path $localItemPath -PathType Container) {
            Write-Host "📦 Uploading directory: $item" -ForegroundColor Yellow
            Upload-Directory -localDir $localItemPath -remoteDir "/$item"
        }
        else {
            Write-Host "📄 Uploading file: $item" -ForegroundColor Yellow
            Upload-File -localFile $localItemPath -remotePath "/$item"
        }
    }
    else {
        Write-Host "⚠️  Not found: $item" -ForegroundColor Yellow
    }
}

Write-Host "`n✅ FTP upload completed!" -ForegroundColor Green
Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. SSH into server" -ForegroundColor White
Write-Host "2. Navigate to project directory" -ForegroundColor White
Write-Host "3. Run: npm install --production" -ForegroundColor White
Write-Host "4. Run: npx prisma migrate deploy" -ForegroundColor White
Write-Host "5. Run: npx prisma generate" -ForegroundColor White
Write-Host "6. Start with PM2: pm2 start ecosystem.config.js" -ForegroundColor White

