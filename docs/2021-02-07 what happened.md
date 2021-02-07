# 2021-02-07

You just wrapped your top-level `App.tsx` in a `<Router>`.

This gives you the ability to use the `useLocation()` hook down the stack. So you're going to do this in `<SignInStateRouter>` I guess to render different components depending on the URL. Within the state of `notSignedIn`.

That whole logic probably needs re-visiting given this decision. Sounds like a matrix of URL/state with a render (or not) in each block?
