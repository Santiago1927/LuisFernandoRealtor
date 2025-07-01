import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  Timestamp,
  DocumentData,
  QuerySnapshot,
  DocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Property } from '../src/types/property';

// Collection names
export const COLLECTIONS = {
  PROPERTIES: 'properties',
  BUYERS: 'buyers',
  OWNERS: 'owners',
  CONTACTS: 'contacts'
} as const;

// Property operations
export const propertyService = {
  // Get all properties
  async getAllProperties(): Promise<Property[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.PROPERTIES));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Property[];
    } catch (error) {
      console.error('Error getting properties:', error);
      throw error;
    }
  },

  // Get property by ID
  async getPropertyById(id: string): Promise<Property | null> {
    try {
      const docRef = doc(db, COLLECTIONS.PROPERTIES, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Property;
      }
      return null;
    } catch (error) {
      console.error('Error getting property:', error);
      throw error;
    }
  },

  // Create new property
  async createProperty(propertyData: Omit<Property, 'id'>): Promise<Property> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.PROPERTIES), {
        ...propertyData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      
      return {
        id: docRef.id,
        ...propertyData,
        createdAt: propertyData.createdAt,
        updatedAt: propertyData.updatedAt,
      };
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  },

  // Update property
  async updateProperty(id: string, propertyData: Partial<Property>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.PROPERTIES, id);
      await updateDoc(docRef, {
        ...propertyData,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating property:', error);
      throw error;
    }
  },

  // Delete property
  async deleteProperty(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.PROPERTIES, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  },

  // Get properties with filters
  async getPropertiesWithFilters(filters: {
    city?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    status?: string;
  }): Promise<Property[]> {
    try {
      let q = collection(db, COLLECTIONS.PROPERTIES);
      const constraints = [];

      if (filters.city) {
        constraints.push(where('city', '==', filters.city));
      }
      if (filters.type) {
        constraints.push(where('type', '==', filters.type));
      }
      if (filters.status) {
        constraints.push(where('status', '==', filters.status));
      }
      if (filters.minPrice !== undefined) {
        constraints.push(where('price', '>=', filters.minPrice));
      }
      if (filters.maxPrice !== undefined) {
        constraints.push(where('price', '<=', filters.maxPrice));
      }

      constraints.push(orderBy('createdAt', 'desc'));

      const querySnapshot = await getDocs(query(q, ...constraints));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Property[];
    } catch (error) {
      console.error('Error getting filtered properties:', error);
      throw error;
    }
  },

  // Real-time listener for properties
  subscribeToProperties(callback: (properties: Property[]) => void) {
    const q = query(collection(db, COLLECTIONS.PROPERTIES), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const properties = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Property[];
      callback(properties);
    });
  }
};

// Buyer operations
export const buyerService = {
  async createBuyer(buyerData: any): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.BUYERS), {
        ...buyerData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating buyer:', error);
      throw error;
    }
  },

  async getAllBuyers(): Promise<any[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.BUYERS));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      }));
    } catch (error) {
      console.error('Error getting buyers:', error);
      throw error;
    }
  }
};

// Owner operations
export const ownerService = {
  async createOwner(ownerData: any): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.OWNERS), {
        ...ownerData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating owner:', error);
      throw error;
    }
  },

  async getAllOwners(): Promise<any[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.OWNERS));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      }));
    } catch (error) {
      console.error('Error getting owners:', error);
      throw error;
    }
  }
};

// Contact operations
export const contactService = {
  async createContact(contactData: any): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.CONTACTS), {
        ...contactData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },

  async getAllContacts(): Promise<any[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.CONTACTS));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      }));
    } catch (error) {
      console.error('Error getting contacts:', error);
      throw error;
    }
  }
}; 