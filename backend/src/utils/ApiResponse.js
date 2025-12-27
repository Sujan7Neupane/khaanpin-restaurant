// Better way to handler API response
// ApiResponse is our custom class that handles the success messages

class ApiResponse {
  constructor(statusCode, data = [], message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;
