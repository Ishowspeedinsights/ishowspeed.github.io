document.addEventListener('DOMContentLoaded', () => {
    // Fetch posts and media data
    Promise.all([
        fetch('json/posts.json').then(response => response.json()),
        fetch('json/media.json').then(response => response.json())
    ])
    .then(([postsData, mediaData]) => {
        // Handle posts
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = ''; // Clear container before adding posts

        // Separate pinned and non-pinned posts
        let pinnedPosts = postsData.filter(post => post.pinned);
        let nonPinnedPosts = postsData.filter(post => !post.pinned);

        // Sort both pinned and non-pinned posts by id in descending order
        pinnedPosts = pinnedPosts.sort((a, b) => b.id - a.id);
        nonPinnedPosts = nonPinnedPosts.sort((a, b) => b.id - a.id);

        // Append pinned posts first
        pinnedPosts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = 'pinned';
            postElement.id = `post-${post.id}`; // Assign unique ID to article element

            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p class="date">${post.date}</p>
                <p>${post.content}</p>
            `;

            postElement.addEventListener('click', () => {
                window.location.href = `/post?id=${post.id}`; // Redirect to detailed view page
            });

            postsContainer.appendChild(postElement);
        });

        // Add an <hr> to separate pinned and non-pinned posts
        if (pinnedPosts.length > 0) {
            const hrElement = document.createElement('hr');
            postsContainer.appendChild(hrElement);
        }

        // Append non-pinned posts
        nonPinnedPosts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = '';
            postElement.id = `post-${post.id}`; // Assign unique ID to article element

            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p class="date">${post.date}</p>
                <p>${post.content}</p>
            `;

            postElement.addEventListener('click', () => {
                window.location.href = `/post?id=${post.id}`; // Redirect to detailed view page
            });

            postsContainer.appendChild(postElement);
        });

//        // Handle media
//        const imageContent = document.getElementById('image-content');
//        const videoContent = document.getElementById('video-content');
//
//        // Set image content
//        if (mediaData.imageOfTheDay) {
//            imageContent.innerHTML = mediaData.imageOfTheDay.htmlTag;
//            document.getElementById('image-date').textContent = mediaData.imageOfTheDay.date;
//            document.getElementById('image-description').textContent = mediaData.imageOfTheDay.description;
//        }
//
//        // Set video content
//        if (mediaData.videoOfTheDay) {
//            videoContent.innerHTML = mediaData.videoOfTheDay.htmlTag;
//            document.getElementById('video-date').textContent = mediaData.videoOfTheDay.date;
//            document.getElementById('video-description').textContent = mediaData.videoOfTheDay.description;
//        }
    })
    .catch(error => console.error('Error fetching data:', error));
});
