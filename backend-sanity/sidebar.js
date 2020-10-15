import React, { Children } from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { MdHome as HomeIcon } from 'react-icons/md';

// Build a custom sidebar
const Sidebar = () =>
  S.list()
    .title(`Slick's Slices`)
    .items([
      // Create new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <HomeIcon />)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // Make a new document ID, so we don't have a random string of numbers
            .documentId('downtown')
        ),
      // Add in the rest of our document items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);

export default Sidebar;
