require.config({
  baseUrl: "/libs",
  paths:  {
    jquery: "jquery/jquery",
    semantic: "semantic/semantic.min",
    datatable: "https://cdn.datatables.net/1.10.16/js/jquery.dataTables",
    my: "my/my"
  },
  shim: {
    semantic: {
      deps : ["jquery"]
    }
  }
});
