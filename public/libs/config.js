require.config({
  baseUrl: "/libs",
  paths:  {
    jquery: "jquery/jquery",
    semantic: "semantic/semantic.min",
    my: "my/my"
  },
  shim: {
    semantic: {
      deps : ["jquery"]
    }
  }
});
