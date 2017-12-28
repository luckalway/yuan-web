require.config({
  baseUrl: "/libs",
  paths:  {
    jquery: "jquery/jquery-min",
    semantic: "semantic/semantic.min",
    my: "my/my",
  },
  shim: {
    semantic: {
      deps : ["jquery"]
    }
  }
});
