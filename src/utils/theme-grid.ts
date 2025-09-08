function applyStylesheet(id: string, href: string) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

export function applyDevExtremeTheme(theme: "light" | "dark") {
//   applyStylesheet("dx-custom", `/theme/devextreme.custom.${theme}.css`);
  applyStylesheet("dx-theme", `/theme/dx.material.${theme}-theme.css`);
}
