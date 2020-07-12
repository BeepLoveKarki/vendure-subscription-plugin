import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { PluginInitOptions } from './types';
import { PLUGIN_INIT_OPTIONS } from './constants';
import { MailSubscriptionEntity } from './entities/mailsubscription.entity';
import { PhoneSubscriptionEntity } from './entities/phonesubscription.entity';
import { MailSubscriptionService } from './service/mailsubscription.service';
import { PhoneSubscriptionService } from './service/phonesubscription.service';
import { adminApiExtensions,shopApiExtensions } from './api/api-extensions';
import { SubscriptionShopResolver } from './api/subscription-shop.resolver';
import { SubscriptionAdminResolver } from './api/subscription-admin.resolver';
import path from 'path';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';

/**
 * An example Vendure plugin.
 *
 * @example
 * ```TypeScript
 * export const config: VendureConfig = {
 *   //...
 *   plugins: [
 *     ExamplePlugin.init({
 *       // options
 *     }),
 *   ]
 * }
 * ```
 */
@VendurePlugin({
    // Importing the PluginCommonModule gives all of our plugin's injectables (services, resolvers)
    // access to the Vendure core providers. See https://www.vendure.io/docs/typescript-api/plugin/plugin-common-module/
    imports: [PluginCommonModule],
    entities: [MailSubscriptionEntity,PhoneSubscriptionEntity],
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [SubscriptionShopResolver],
    },
	adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [SubscriptionAdminResolver],
    },
    providers: [
        MailSubscriptionService,
		PhoneSubscriptionService,
        // By definiting the `PLUGIN_INIT_OPTIONS` symbol as a provider, we can then inject the
        // user-defined options into other classes, such as the {@link ExampleService}.
        { provide: PLUGIN_INIT_OPTIONS, useFactory: () => SubscriptionPlugin.options },
    ]
})
export class SubscriptionPlugin {

    static options: PluginInitOptions;

    /**
     * The static `init()` method is a convention used by Vendure plugins which allows options
     * to be configured by the user.
     */
    static init(options: PluginInitOptions) {
        this.options = options;
        return SubscriptionPlugin;
    }
	
	static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui-extensions'),
        ngModules: [
            {
                type: 'lazy' as const,
                route: 'subscribedmails',
                ngModuleFileName: 'mailsubscription-ui-lazy.module.ts',
                ngModuleName: 'MailSubscriptionUIModule',
            },{
                type: 'lazy' as const,
                route: 'subscribedphones',
                ngModuleFileName: 'phonesubscription-ui-lazy.module.ts',
                ngModuleName: 'PhoneSubscriptionUIModule',
            },
			{
			   type: 'shared' as const,
			   ngModuleFileName: 'subscription-ui-extension.module.ts',
               ngModuleName: 'SubscriptionExtensionModule',
			}
        ],
       translations: {
         en: path.join(__dirname, 'i18n/en.json')
       }
    };
	
}
