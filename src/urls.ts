

enum ENV {
    local= "local",
    development= "development",
    production= "production",
}

const getEnvironment = () : ENV => {
    if(window.location.href.includes("dev.nav.no")){
        return ENV.development
    }
    return ENV.local
}

const API_URL : { [key in ENV]: string } = {
    local: "http://localhost:8787/api",
    development:"https://a11y-statement.ekstern.dev.nav.no",
    production:"https://a11y-statement.ekstern.dev.nav.no"
}
export const apiUrl= API_URL[getEnvironment()];