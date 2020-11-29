interface APIGatewayResponse {
  Type: string;
  Properties: {
    RestApiId: string | { [key: string]: string };
    ResponseType: string;
    ResponseParameters: { [key: string]: string };
    ResponseTemplates?: { [key: string]: string };
  }
}

export const apiGatewayResponse = (type: string, template?: string): APIGatewayResponse => {
  const response: APIGatewayResponse = {
    Type: 'AWS::ApiGateway::GatewayResponse',
    Properties: {
      RestApiId: { Ref: 'ApiGatewayRestApi' },
      ResponseType: type,
      ResponseParameters: {
        'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
        'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
      },
    },
  };
  if (template) {
    response.Properties.ResponseTemplates = {
      'application/json': template
    };
  }
  return response;
}
