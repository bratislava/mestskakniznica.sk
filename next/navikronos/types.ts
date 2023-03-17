import { NavikronosObject } from './internal/navikronosObject'

export type NavikronosRouteLocalizations<Config> = NavikronosObject<Config>['localizations']
export type NavikronosRouteSitemap<Config> = NavikronosObject<Config>['sitemap']
export type NavikronosRouteChildren<Config> = NavikronosObject<Config>['children']
export type NavikronosRouteSiblings<Config> = NavikronosObject<Config>['siblings']
export type NavikronosRouteParents<Config> = NavikronosObject<Config>['parents']
export type NavikronosRouteParent<Config> = NavikronosObject<Config>['parent']
export type NavikronosRouteBreadcrumbs<Config> = NavikronosObject<Config>['breadcrumbs']
