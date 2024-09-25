<script>
  import { Router, Route, Link } from "svelte-routing";
  import Login from "./routes/Login.svelte";
  import Admin from "./routes/Admin.svelte";
  import User from "./routes/User.svelte";
</script>

<Router>
  <!-- Define las rutas -->
  <Route path="/" component={Login} />
  <Route path="/admin" component={Admin} />
  <Route path="/user" component={User} />
</Router>
