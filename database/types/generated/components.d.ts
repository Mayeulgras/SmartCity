import type { Struct, Schema } from '@strapi/strapi';

export interface LocationComponentLocation extends Struct.ComponentSchema {
  collectionName: 'components_location_component_locations';
  info: {
    displayName: 'location';
  };
  attributes: {
    lat: Schema.Attribute.Decimal;
    lon: Schema.Attribute.Decimal;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'location-component.location': LocationComponentLocation;
    }
  }
}
