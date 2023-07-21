pages = {};

pages.page_index = () => {};

pages.page_sign_in = () => {};

pages.page_dashboard = () => {};

pages.loadFor = (page) => {
  eval("pages.page_" + page + "();");
};
