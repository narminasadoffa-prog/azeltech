import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Bütün blog yazılarını gətir
  const allPosts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
  });

  console.log(`Total blog posts: ${allPosts.length}`);

  // Eyni başlıqlı və ya eyni məzmunlu yazıları tap
  const seenTitles = new Set();
  const seenContent = new Set();
  const postsToDelete = [];

  for (const post of allPosts) {
    const titleKey = post.title?.toLowerCase().trim() || '';
    const contentKey = post.content?.toLowerCase().trim().substring(0, 100) || '';
    
    // Eyni başlıq və ya eyni məzmun varsa, silinməli
    if (titleKey && seenTitles.has(titleKey)) {
      postsToDelete.push(post.id);
      console.log(`Duplicate title found: "${post.title}" (ID: ${post.id})`);
    } else if (titleKey) {
      seenTitles.add(titleKey);
    }

    if (contentKey && seenContent.has(contentKey) && !seenTitles.has(titleKey)) {
      postsToDelete.push(post.id);
      console.log(`Duplicate content found: "${post.title}" (ID: ${post.id})`);
    } else if (contentKey) {
      seenContent.add(contentKey);
    }
  }

  // Yalnız 1 xəbər qalmalıdır - ən yenisini saxla, digərlərini sil
  if (allPosts.length > 1) {
    const postsToKeep = allPosts.slice(0, 1); // İlk (ən yeni) yazı
    const postsToRemove = allPosts.slice(1); // Qalan bütün yazılar

    console.log(`\nKeeping post: "${postsToKeep[0].title}" (ID: ${postsToKeep[0].id})`);
    console.log(`Posts to delete: ${postsToRemove.length}`);

    for (const post of postsToRemove) {
      await prisma.blogPost.delete({
        where: { id: post.id },
      });
      console.log(`Deleted: "${post.title}" (ID: ${post.id})`);
    }
  }

  // Eyni yazıları da sil
  for (const postId of postsToDelete) {
    try {
      await prisma.blogPost.delete({
        where: { id: postId },
      });
      console.log(`Deleted duplicate post (ID: ${postId})`);
    } catch (error) {
      console.log(`Post ${postId} already deleted or not found`);
    }
  }

  const remainingPosts = await prisma.blogPost.findMany();
  console.log(`\nRemaining blog posts: ${remainingPosts.length}`);
  remainingPosts.forEach(post => {
    console.log(`- "${post.title}" (ID: ${post.id})`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

