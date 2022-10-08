import { SearchProvider } from "modules/config"
import { HydratedProvider, SEARCH_PROVIDERS } from "./constants"

export const getHydratedProviders = (providers: SearchProvider[]): HydratedProvider[] => {
    return providers.map((provider) => {
        const { type, name, url } = provider

        if (name && url) return provider

        const availableProvider = SEARCH_PROVIDERS.filter(({ type: availableType }) => type === availableType)[0]

        if (availableProvider) return { ...availableProvider, ...provider }

        return null
    }).filter((provider): provider is HydratedProvider => provider !== null)
}