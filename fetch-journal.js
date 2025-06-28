// Load Sanity client (this line assumes you already have the <script> tag in HTML)
// <script src="https://cdn.jsdelivr.net/npm/@sanity/client@latest"></script>

// Create the client
const client = sanity.Client({
  projectId: 'ibe92zgg',       // ✅ Your projectId
  dataset: 'production',       // ✅ Your dataset name
  apiVersion: '2023-01-01',    // ✅ Any date works; this locks the API version
  useCdn: false               // ✅ Use CDN for faster reads
});

// Fetch posts
client
  .fetch(`*[_type == "post"] | order(_createdAt desc){
    _id,
    title,
    body,
    "imageUrl": mainImage.asset->url
  }`)
  .then(posts => {
    const container = document.getElementById('journal');
    container.innerHTML = ""; // Clear loading text

    posts.forEach(post => {
      // Convert all Portable Text blocks to plain text
      let bodyText = '';
      if (post.body && Array.isArray(post.body)) {
        bodyText = post.body
          .map(block => block.children.map(child => child.text).join(''))
          .join('\n');
      }

      // Build the article element
      const article = document.createElement('article');
      article.style.border = "1px solid #ddd";
      article.style.padding = "1rem";
      article.style.margin = "1rem 0";
      article.style.borderRadius = "6px";
      article.style.background = "#fff";

      article.innerHTML = `
        <h2>${post.title}</h2>
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" style="max-width:100%;height:auto;margin:0.5rem 0;">` : ''}
        <p>${bodyText}</p>
      `;

      container.appendChild(article);
    });
  })
  .catch(err => {
    console.error('Fetch error:', err);
    document.getElementById('journal').innerText = 'Failed to load entries.';
  });
