const { Route, Redirect } = require("react-router")

const PublicRoute = ({
    component: Component,
    isAuthenticated,
    ...rest

}) => {
    return (
        <Route
            {...rest}
            component={ props => (
                !isAuthenticated 
                    ? <Component {...props} />
                    : <Redirect to="/" />
            ) }
        
        />           
        
    )
}

export default PublicRoute