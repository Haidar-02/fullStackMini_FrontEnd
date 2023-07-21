pages = {};

pages.page_index = () => {};

pages.page_signin = () => {};

pages.page_dashboard = () => {};

pages.loadFor = (page) => {
  eval("pages.page_" + page + "();");
};
