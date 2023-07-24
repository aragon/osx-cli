import axios, { AxiosResponse } from 'axios';
import { PluginRepo } from 'src/types';

/**
 * Queries the subgraph at the provided URL and retrieves plugin repositories.
 *
 * @param {string} url - The URL of the subgraph to query.
 * @returns {Promise<PluginRepo[]>} - A promise that resolves to an array of plugin repositories.
 * @throws Will throw an error if the Axios request fails.
 */

export async function queryPluginRepos(url: string): Promise<PluginRepo[]> {
  const query = `
    {
      pluginRepos {
        id
        subdomain
        releases {
          release
          metadata
          builds {
            build
            metadata
            pluginSetup {
              id
            }
          }
        }
      }
    }
  `;

  try {
    const response: AxiosResponse<{ data: { pluginRepos: PluginRepo[] } }> = await axios({
      url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        query,
      },
    });

    return response.data.data.pluginRepos;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
