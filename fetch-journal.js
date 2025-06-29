<script type="module">
  import { createClient } from "https://esm.sh/@sanity/client";

  const client = createClient({
    projectId: "ibe92zg9",
    dataset: "production",
    apiVersion: "2023-01-01",
    useCdn: false,
    token: "sk4gDAkyA8lngW0l6IIpM3zL01aUrBQly6q876sSm9bus4WgCvzrNCsTbFMKK5sgpNOEfT1EY9gQcMt4VHE4d7mhHQ6ujxGrUb0UnRYmAzjRU8rRLjanw1WX5PVOGAqgtQPXmZkZVLgBoNH9rKRiv9EXTJb0M169j05LcWCMPAXW2Cjm9C5x"
  });

  client
    .fetch(`*[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc){
      _id,
      title,
      body,
      publishedAt,
      _createdAt,
      "authorName": author->name,
      "imageUrl": mainImage.asset->url
    }`)
    .then(posts => {
      const container = document.getElementById('journal');
      container.innerHTML = "";

      posts.forEach(post => {
        // Use publishedAt if set, else fallback to createdAt
        const dateRaw = post.publishedAt || post._createdAt;
        const date = new Date(dateRaw).toLocaleDateString();

        // Convert Portable Text to plain text
        let bodyText = '';
        if (post.body && Array.isArray(post.body)) {
          bodyText = post.body
            .map(block => block.children.map(child => child.text).join(''))
            .join('\n');
        }

        // Build article
        const article = document.createElement('article');
        article.innerHTML = `
          <h2>${post.title}</h2>
          <p><em>By ${post.authorName || 'Unknown Author'} on ${date}</em></p>
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
</script>
