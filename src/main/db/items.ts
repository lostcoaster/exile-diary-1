import DB from './index';
import Logger from 'electron-log';
const logger = Logger.scope('db/items');

const Items = {
  insertItems: (items: any[]) => {
    logger.debug(`Inserting ${items.length} items`);
    const query = `
      INSERT INTO items
      (id, event_id, icon, name, rarity, category, identified, typeline, sockets, stacksize, rawdata, value, original_value)
      values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)
      `;
    return DB.transaction(query, items);
  },
  getMatchingItemsCount: async (itemIds: string[]): Promise<number> => {
    const itemQueries: string[] = itemIds.map((id) => `(id = '${id}')`);

    const query = `select count(1) as count from items where (${itemQueries.join(' or ')})`;

    return DB.get(query);
  },
};

export default Items;
