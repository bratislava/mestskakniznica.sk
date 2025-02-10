import { Route, Switch } from "react-router-dom";
import { AnErrorOccurred } from "@strapi/helper-plugin";
import pluginId from "../pluginId";
import HomePage from "./Homepage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Switch>
          <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
          <Route component={AnErrorOccurred} />
        </Switch>
      </div>
    </QueryClientProvider>
  );
};

export default App;
