const ServerError = require('../../lib/error');
const { Pool } = require('pg');
const CONFIG = require('../../../../config.json');
let types = require('pg').types
types.setTypeParser(1700, function(val) {
    return parseFloat(val);
});
class CupcakeService {

  constructor() {
    this.pool = new Pool(
      CONFIG.databaseConnection
    );
  }
  /**
   * @param {Object} options
   * @param {Object} options.body Cupcake object that needs to be added to the store
   * @throws {Error}
   * @return {Promise}
   */
  async addCupcake(options) {
    try {
      const toBeCreated = options.body;
      const query = {
        text: `INSERT INTO cupcakes ( ${Object.keys(toBeCreated).join(",")} ) 
          VALUES ${this.constructValuesString(Object.keys(toBeCreated).length)}
          RETURNING *`,
        values: Object.values(toBeCreated)
      };
      const result = await this.pool.query(query);
      return {
        status: 200,
        data: result.rows[0]
      };

    } catch (error) {
      throw new ServerError({
        status: 500,
        error: error
      });
    };
  };

  /**
   * @param {Object} options
   * @throws {Error}
   * @return {Promise}
   */
  async listCupcakes(options) {
    try {
      const result = await this.pool.query('SELECT * from cupcakes');
      return {
        status: 200,
        data: result.rows
      };
    } catch (error) {
      throw new ServerError({
        status: 500,
        error: error
      });
    };
  }
  /**
   * @param {Object} options
   * @param {Integer} options.cupcakeId ID of cupcake to return
   * @throws {Error}
   * @return {Promise}
   */
  async getCupcakeById(options) {
    try {
      const query = {
        text: 'SELECT * FROM cupcakes WHERE id = $1',
        values: [options.cupcakeId],
      };
      const result = await this.pool.query(query);
      if (result.rows.length == 0) {
        return {
          status: 404,
          data: {message: 'Invalid ID supplied'}
        }
      }
      return {
        status: 200,
        data: result.rows[0]
      };
    } catch (error) {
      throw new ServerError({
        status: 500,
        error: error
      });
    };
  };

  /**
   * @param {Object} options
   * @param {Integer} options.cupcakeId ID of cupcake that needs to be updated
   * @param {Object} options.body Updated cupcake object
   * @throws {Error}
   * @return {Promise}
   */
  async updateCupcake(options) {
    try {
      if (isNaN(options.cupcakeId)) {
        throw new ServerError({
          status: 400,
          error: 'Invalid ID supplied'
        });
      };
      const toBeModified = options.body;
      const setClause = Object.keys(toBeModified)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(', ');

      const query = {
        text: `UPDATE cupcakes 
          SET ${setClause}
          WHERE id = ${options.cupcakeId}
          RETURNING *`,
        values: Object.values(toBeModified)
      };
      const result = await this.pool.query(query);
      return {
        status: 200,
        data: result.rows[0]
      };
    } catch (error) {
      throw new ServerError({
        status: 500,
        error: error
      });
    };
  };

  /**
   * @param {Object} options
   * @param {Integer} options.cupcakeId Cupcake id to delete
   * @throws {Error}
   * @return {Promise}
   */
  async deleteCupcake(options) {
    try {
      const query = {
        text: 'DELETE FROM cupcakes WHERE id = $1',
        values: [options.cupcakeId],
      };
      const result = await this.pool.query(query);
      if (result.rows.length == 0) {
        return {
          status: 404,
          data: {}
        }
      }
      return {
        status: 200,
        data: {}
      }
    } catch (error) {
      throw new ServerError({
        status: 500,
        error: error
      });
    };
  };

  /**
   * utility function to create the values string for a given length
   * @param length of the string to be created
   * @returns a string like ($1,$2,$3) for a param of 3
  */
  constructValuesString(length) {
    let toReturnString = '(';
    for (let i = 1; i <= length; i++) {
      toReturnString += `$${i},`
    }
    return toReturnString.replace(/.$/, ")"); //replace last comma with )
  }

}
module.exports = CupcakeService;
