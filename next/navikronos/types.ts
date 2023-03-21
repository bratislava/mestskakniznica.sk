import { NavikronosConfig } from './config-type'
import { NavikronosObject } from './internal/navikronosObject'

export type NavikronosRouteLocalizations<Config extends NavikronosConfig> =
  NavikronosObject<Config>['localizations']
export type NavikronosRouteSitemap<Config extends NavikronosConfig> =
  NavikronosObject<Config>['sitemap']
export type NavikronosRouteChildren<Config extends NavikronosConfig> =
  NavikronosObject<Config>['children']
export type NavikronosRouteSiblings<Config extends NavikronosConfig> =
  NavikronosObject<Config>['siblings']
export type NavikronosRouteParents<Config extends NavikronosConfig> =
  NavikronosObject<Config>['parents']
export type NavikronosRouteParent<Config extends NavikronosConfig> =
  NavikronosObject<Config>['parent']
export type NavikronosRouteBreadcrumbs<Config extends NavikronosConfig> =
  NavikronosObject<Config>['breadcrumbs']
