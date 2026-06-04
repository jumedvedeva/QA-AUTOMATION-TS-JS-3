function fetchPost(postId) {
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not OK – status: ${response.status}`);
            }
            return response.json();
        });
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

fetchPost(1)

    .then((post) => {
        return savePost(post);
    })

    .then((post) => {
        const formatted = formatPost(post);
        console.log('\n[formatPost] Formatted output:\n');
        console.log(formatted);
        return post;
    })

    .then((post) => {
        console.log('\n[summary] Quick summary →', {
            id:     post.id,
            userId: post.userId,
            title:  post.title.slice(0, 30) + '…'
        });
    })

    .catch((error) => {
        console.error('[Error] Something went wrong while fetching the post:', error.message);
    })

    .finally(() => {
        console.log('\n[finally] Fetch chain completed (success or failure).');
    });
