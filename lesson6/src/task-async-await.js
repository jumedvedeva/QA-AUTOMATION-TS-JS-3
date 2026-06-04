async function fetchPost(postId) {
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Network response was not OK – status: ${response.status}`);
    }

    const post = await response.json();
    return post;
}

function formatPost(post) {
    return `
   Post #${post.id} (User #${post.userId})
   Title : ${post.title}
   Body  : ${post.body}
   `.trim();
}

function savePost(post) {
    savedPosts.push(post);
    console.log(`[savePost] Post #${post.id} saved. Total saved: ${savedPosts.length}`);
    return post;
}

const savedPosts = [];

async function main() {
    try {
        const post = await fetchPost(1);
        savePost(post);
        const formatted = formatPost(post);
        console.log('\n[formatPost] Formatted output:\n');
        console.log(formatted);
        console.log('\n[summary] Quick summary →', {
            id:     post.id,
            userId: post.userId,
            title:  post.title.slice(0, 30) + '…'
        });

    } catch (error) {
        console.error('[Error] Something went wrong while fetching the post:', error.message);

    } finally {
        console.log('\n[finally] Fetch flow completed (success or failure).');
    }
}

main();
