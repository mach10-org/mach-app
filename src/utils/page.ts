const getPreviewURL = (image?: string) => {
  const preview = image || 'placeholder-social.png'
  return preview.startsWith('http') ? preview : `${import.meta.env.BASE_URL}img/${preview}`
};

export { getPreviewURL };
