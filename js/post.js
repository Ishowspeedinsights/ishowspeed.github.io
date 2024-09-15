document.addEventListener('DOMContentLoaded', function() {
    // Extract the query parameter `id` from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        fetch('json/post.json')
            .then(response => response.json())
            .then(posts => {
                // Find the post with the specified id
                const post = posts.find(p => p.id === parseInt(postId));

                if (post) {
                    // Set the page title and meta tags dynamically
                    document.title = post.title; // Update the <title> tag
                    document.getElementById('post-title').innerText = post.title; // Update <h1> text
                    document.getElementById('video-date').innerText = post.date;

                    // Inject meta tags into the head
                    const existingHeadContent = document.head.innerHTML;
                    const newHeadContent = post.head;

                    // Append new meta tags to the existing head content
                    document.head.innerHTML = existingHeadContent + newHeadContent;

                    // Display the post content
                    document.getElementById('post-content').innerHTML = post.content;
                } else {
                    document.getElementById('post-content').innerHTML = '<p>Post not found.</p>';
                }
            })
            .catch(error => console.error('Error loading the post:', error));
    } else {
        document.getElementById('post-content').innerHTML = '<p>No post ID provided.</p>';
    }
});
