// Import the generic APIResponse type from the types module
import { APIResponse } from '../types';


interface RequestOptions extends RequestInit {
  // Optional key-value dictionary of query parameters to append to the request URL
  queryParams?: Record<string, string | number | boolean> | undefined;
}

/**
 * Universal HTTP client for communicating with REST APIs.
 * Provides typed responses, token management, and safe error handling.
 */
export class ApiClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;
  private authToken?: string | undefined;


  constructor(baseUrl: string, defaultHeaders?: Record<string, string>) {
    // Remove any trailing slash to avoid duplicate slashes in endpoint URLs (e.g., /api//endpoint)
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.defaultHeaders = defaultHeaders ?? {};
  }

  /**
   * Sets the Bearer authentication token for all subsequent authorized requests.
   * @param token - The authentication token string
   */
  public setAuthToken(token: string): void {
    // Store the token in the instance field
    this.authToken = token;
  }


  public clearAuthToken(): void {
    // Reset the authentication token field to undefined
    this.authToken = undefined;
  }


  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<APIResponse<T>> {

    const { queryParams, ...fetchOptions } = options;


    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    const url = new URL(`${this.baseUrl}${normalizedEndpoint}`);


    if (queryParams) {
      // Iterate over each key-value pair in queryParams
      Object.entries(queryParams).forEach(([key, value]) => {
        // Append parameter key and stringified value to URL search parameters
        url.searchParams.append(key, String(value));
      });
    }

    // 2. Prepare the final request headers
    const headers: Record<string, string> = {
      // Default to JSON content type for API communication
      'Content-Type': 'application/json',
      // Include client default headers
      ...this.defaultHeaders,
      // Include custom headers passed specifically for this request
      ...(fetchOptions.headers as Record<string, string>),
    };

    // Automatically attach the Authorization header if an auth token is set
    if (this.authToken) {
      // Format as Bearer token in the Authorization header
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    try {

      const response = await fetch(url.toString(), {

        ...fetchOptions,
        headers,
      });

      // Variable to hold the parsed generic response data
      let responseData: T | undefined = undefined;
      // Variable to hold any error message string
      let errorMessage: string | undefined = undefined;

      // 4. Retrieve the response body as plain text for safe parsing
      const text = await response.text();
      // Check if the response body is not empty
      if (text) {
        try {
          // Attempt to parse the response text as JSON
          const parsed = JSON.parse(text);
          // Check if the HTTP status is in the 2xx success range
          if (response.ok) {
            // Successful response: cast parsed JSON data to type T
            responseData = parsed as T;
          } else {
            // Error status (4xx/5xx): extract message property if present, otherwise use raw text
            errorMessage =
              typeof parsed === 'object' && parsed !== null && 'message' in parsed
                ? String((parsed as { message: unknown }).message)
                : text;
          }
        } catch {

          if (!response.ok) {

            errorMessage = text;
          }
        }
      }

      // Return standardized APIResponse object
      return {

        status: response.status,
        data: responseData,
        error: errorMessage,
        headers: response.headers,
      };
    } catch (err) {
      return {
        // Status code 0 indicates a network/client-level failure
        status: 0,
        // Extract message from Error instance or use a fallback message
        error: err instanceof Error ? err.message : 'Network request failed',
        // Return an empty Headers object
        headers: new Headers(),
      };
    }
  }


  public async get<T>(endpoint: string, queryParams?: Record<string, string | number | boolean>): Promise<APIResponse<T>> {
    // Delegate to the request method with GET method and optional query parameters
    return this.request<T>(endpoint, {
      method: 'GET',
      ...(queryParams !== undefined && { queryParams }),
    });
  }

  public async post<T>(endpoint: string, body?: unknown): Promise<APIResponse<T>> {
    // Delegate to the request method with POST method and JSON-serialized body
    return this.request<T>(endpoint, {
      method: 'POST',
      ...(body !== undefined && { body: JSON.stringify(body) }),
    });
  }


  public async put<T>(endpoint: string, body?: unknown): Promise<APIResponse<T>> {
    // Delegate to the request method with PUT method and JSON-serialized body
    return this.request<T>(endpoint, {
      method: 'PUT',
      ...(body !== undefined && { body: JSON.stringify(body) }),
    });
  }

  public async delete<T>(endpoint: string): Promise<APIResponse<T>> {
    // Delegate to the request method with DELETE method
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}