require.config({
  baseUrl: "/libs",
  paths:  {
    jquery: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min",
    semantic: "semantic/semantic",
    my: "my/my",
  },
  shim: {
    semantic: {
      deps : ["jquery"]
    }
  }
});
