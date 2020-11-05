const apiResponses = {
  200: (body: { [key: string]: any }, headers?: { [key: string]: any }) => {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(body, null, 2),
    };
  },
  404: (body: { [key: string]: any }, headers?: { [key: string]: any }) => {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify(body, null, 2),
    };
  },
  500: (body: { [key: string]: any }, headers?: { [key: string]: any }) => {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(body, null, 2),
    };
  },
};

export default apiResponses;
