document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.querySelector('#archive-content');

    if (!contentDiv) {
        console.error('Content div not found');
        return;
    }

    fetch('json/archive.json')
        .then(response => response.json())
        .then(data => {
            const categories = {};

            // Organize posts by category
            data.forEach(post => {
                if (!categories[post.category]) {
                    categories[post.category] = [];
                }
                categories[post.category].push(post);
            });

            // Clear existing content in the div
            contentDiv.innerHTML = ''; 

            // Create HTML content for each category
            for (const [category, posts] of Object.entries(categories)) {
                // Add the category title as an <h2> element
                const categoryTitle = document.createElement('h2');
                categoryTitle.textContent = category;
                contentDiv.appendChild(categoryTitle);

                // Create <p> elements for each post
                posts.forEach(post => {
                    const postParagraph = document.createElement('p');

                    // Create a link for each post title
                    const postLink = document.createElement('a');
                    postLink.href = `post?id=${post.id}`;
                    postLink.textContent = post.title;
                    postParagraph.appendChild(postLink);

                    // Append description
                    const postDesc = document.createElement('span');
                    postDesc.textContent = ` - ${post.desc}`;
                    postParagraph.appendChild(postDesc);

                    // Append date
                    const postDate = document.createElement('span');
                    postDate.classList.add('date');
                    postDate.textContent = ` ${post.date}`;
                    postParagraph.appendChild(postDate);

                    contentDiv.appendChild(postParagraph);
                });
            }
        })
        .catch(error => console.error('Error loading the archive data:', error));
});
