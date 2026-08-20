const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://testaug.onrender.com';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const result = await response.json().catch(() => ({
      success: false,
      error: 'Invalid response format from server.',
    }));

    if (!response.ok && result.success !== false) {
      result.success = false;
      result.error = result.error || `HTTP Error ${response.status}: ${response.statusText}`;
    }

    return result;
  } catch (err) {
    return {
      success: false,
      error: 'Unable to connect to the staff API. Please check your internet connection or try again later.',
      isNetworkError: true,
    };
  }
}

export const staffApi = {
  async checkHealth() {
    return request('/health');
  },

  async getStaff(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, value);
      }
    });

    const queryString = query.toString();
    const endpoint = `/api/staff${queryString ? `?${queryString}` : ''}`;
    return request(endpoint);
  },

  async getStaffById(id) {
    return request(`/api/staff/${id}`);
  },

  async createStaff(data) {
    const payload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      shift: data.shift,
      status: data.status,
      joiningDate: data.joiningDate,
    };
    return request('/api/staff', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateStaff(id, data) {
    const payload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      shift: data.shift,
      status: data.status,
      joiningDate: data.joiningDate,
    };
    return request(`/api/staff/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteStaff(id) {
    return request(`/api/staff/${id}`, {
      method: 'DELETE',
    });
  },

  async getFilters() {
    return request('/api/filters');
  },

  async getStats() {
    return request('/api/stats');
  },
};
