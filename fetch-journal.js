import sanityClient from 'https://cdn.skypack.dev/@sanity/client';

const client = sanityClient({
  projectId: 'ibe92zg9', // << your project ID
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true
});

client
  .fetch(`*[_type == "post"] | order(_createdAt desc){
    _id,
    title,
    body
  }`)
  .then(posts => {
    const container = document.getElementById('journal');
    container.innerHTML = ""; // clear loading text
    posts.forEach(post => {
      const article = document.createElement('article');
      article.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      `;
      container.appendChild(article);
    });
  })
  .catch(err => {
    console.error('Fetch error:', err);
    document.getElementById('journal').innerText = 'Failed to load entries.';
  });
