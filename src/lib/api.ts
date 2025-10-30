/**
 * 通用 API 调用函数
 * @param url - API 接口地址
 * @param headers - 请求头
 * @param data - 请求数据
 * @returns Promise<any> - 返回响应数据
 */
export async function callApi(
  url: string,
  headers: Record<string, string> = {},
  data?: any
): Promise<any> {
  try {
    const options: RequestInit = {
      method: data ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API 调用错误:', error);
    throw error;
  }
}
