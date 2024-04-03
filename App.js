import React, { useState } from 'react';
import { View, FlatList, Text, TextInput, Switch, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import useBookData from './useBookData';
import BookItem from './BookItem';

const App = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { loading, error, books } = useBookData();
  const [expandedBookId, setExpandedBookId] = useState(null);

  const toggleRTL = () => {
    setIsRTL(!isRTL);
  };

  const toggleBookExpansion = (bookId) => {
    setExpandedBookId(expandedBookId === bookId ? null : bookId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{isRTL ? 'کتابیں' : 'Books'}</Text>
      </View>
      <View style={[styles.searchContainer, isRTL ? styles.searchContainerRTL : null]}>
        <TextInput
          style={styles.searchInput}
          placeholder={isRTL ? "کتاب کا نام تلاش کریں" : "Search by book name"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.toggleButton} onPress={toggleRTL}>
          <Text>{isRTL ? 'LTR' : 'RTL'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.scrollView}
        data={books}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <BookItem
            book={item}
            baseCoverPhotoUrl="https://dev.iqrakitab.net/" // Pass the base URL here
            isExpanded={expandedBookId === item._id}
            onToggleExpansion={() => toggleBookExpansion(item._id)}
            isRTL={isRTL}
            key={item._id} // Adding key prop for each BookItem
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchContainerRTL: {
    flexDirection: 'row-reverse',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    paddingHorizontal: 12,
    backgroundColor: '#F3EEEE', // Background color
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    fontSize: 15,
    marginRight: 10,
  },
  toggleButton: {
    padding: 14,
    marginLeft: 10,
    marginRight: 20,
    backgroundColor: '#ccc',
    borderRadius: 15,
  },
  scrollView: {
    flex: 1,
  },
});

export default App;
