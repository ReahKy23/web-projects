window.onload = () => {
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const closeSdb = document.getElementById("closeSidebar");
  const openSdb = document.getElementById("openSidebar");
  

  // sign out modal
  openSdb.addEventListener("click", () => {
    sidebarOverlay.classList.remove("hidden");
  });

  closeSdb.addEventListener("click", () => {
    sidebarOverlay.classList.add("hidden");
  });
};
