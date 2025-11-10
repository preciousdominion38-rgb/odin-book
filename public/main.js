// public/main.js
document.addEventListener('click', async (e) => {
  if (e.target.matches('.like-btn')) {
    const id = e.target.dataset.id;
    try {
      const res = await fetch(`/posts/${id}/toggle-like`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        e.target.querySelector('.like-count').textContent = data.likesCount;
        if (data.liked) e.target.classList.add('liked'); else e.target.classList.remove('liked');
      } else {
        console.warn('Like failed');
      }
    } catch (err) { console.error(err); }
  }
});
