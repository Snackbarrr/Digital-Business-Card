<script type="module">
  import { createClient } from "https://esm.sh/@sanity/client";

  const client = createClient({
    projectId: "ibe92zgg",
    dataset: "production",
    apiVersion: "2023-01-01",
    useCdn: false,
    token: "sk4gDAkyA8lngW0l6IIpM3zL01aUrBQly6q876sSm9bus4WgCvzrNCsTbFMKK5sgpNOEfT1EY9gQcMt4VHE4d7mhHQ6ujxGrUb0UnRYmAzjRU8rRLjanw1WX5PVOGAqgtQPXmZkZVLgBoNH9rKRiv9EXTJb0M169j05LcWCMPAXW2Cjm9C5x"
  });

  client
    .fetch(`*[_type == "post"] | order(_createdAt desc){
      _id,
      title,
      body,
      "imageUrl": mainImage.asset->url
    }`)
    .then(posts => {
      const container = document.getElementById('journal');
      container.innerHTML = "";
      posts.forEach(post => {
        let bodyText = '';
        if (post.body && Array.isArray(post.body)) {
          bodyText = post.body
            .map(block => block.children.map(child => child.text).join(''))
            .join('\n');
        }
        const article = document.createElement('article');
        article.innerHTML = `
          <h2>${post.title}</h2>
          ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" style="max-width:100%;height:auto;">` : ''}
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
