import { useState, useEffect, useCallback } from 'react';
import { contactAPI } from '../services/api';

const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Show toast notification
  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  }, []);

  // Fetch all contacts
  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await contactAPI.getAll();
      setContacts(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch contacts');
      showToast('Failed to fetch contacts', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Add a new contact
  const addContact = useCallback(async (contactData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await contactAPI.create(contactData);
      setContacts((prev) => [response.data, ...prev]);
      showToast('Contact added successfully!', 'success');
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add contact';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Delete a contact
  const deleteContact = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await contactAPI.delete(id);
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
      showToast('Contact deleted successfully!', 'success');
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete contact';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Sort contacts
  const sortContacts = useCallback((sortBy = 'date', order = 'desc') => {
    setContacts((prev) => {
      const sorted = [...prev].sort((a, b) => {
        if (sortBy === 'name') {
          return order === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        // Sort by date (createdAt)
        return order === 'asc'
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      });
      return sorted;
    });
  }, []);

  // Load contacts on mount
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return {
    contacts,
    loading,
    error,
    toast,
    fetchContacts,
    addContact,
    deleteContact,
    sortContacts,
    showToast,
  };
};

export default useContacts;
