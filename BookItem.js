import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const BookItem = ({ book, isExpanded, onToggleExpansion, isRTL, baseCoverPhotoUrl }) => {
  const { title, author, isPublished, isArabic, description, coverPhoto } = book;

  // Convert titles to Urdu if in RTL mode
  let urduTitle = '';
  if (isRTL) {
    if (title === 'KHUTBAT') {
      urduTitle = 'خطبات';
    } else if (title === 'Haqeeqat e islam') {
      urduTitle = 'حقیقتِ اسلام';
    }
  }

  const [animation, setAnimation] = useState(new Animated.Value(0));
  const isAnimating = useRef(false);

  const handleToggleExpansion = () => {
    if (!isAnimating.current) {
      isAnimating.current = true;
      Animated.timing(animation, {
        toValue: isExpanded ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        isAnimating.current = false;
        onToggleExpansion();
      });
    }
  };

  const contentHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Adjust the height as needed
  });

  // Concatenate base URL with cover photo URL
  const coverPhotoUri = `${baseCoverPhotoUrl}/${book.coverPhotoUri}`;

  return (
    <TouchableOpacity onPress={handleToggleExpansion}>
      <View style={[styles.container, isRTL && styles.containerRTL]}>
        <Image source={{ uri: coverPhotoUri }} style={styles.coverImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{urduTitle || title}</Text>
          <Text style={[styles.author, isRTL && styles.authorRTL]}>{isRTL ? 'تصنیف: ' : 'By '}{author.name}</Text>
          {isExpanded && (
            <Animated.View style={[styles.detailsContainer, { height: contentHeight }]}>
              <Text style={styles.details}>{isRTL ? 'شائع شدہ: ' : 'Published: '}{isPublished ? 'ہاں' : 'نہیں'}</Text>
              <Text style={styles.details}>{isRTL ? 'زبان: ' : 'Language: '}{isArabic ? 'عربی' : 'غیر عربی'}</Text>
              <Text style={styles.description}>{description}</Text>
            </Animated.View>
          )}
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{isRTL ? 'تاریخ تخلیق: ' : 'Created At: '}{formatDate(author.createdAt)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#F3EEEE', // Light black color
  },
  containerRTL: {
    flexDirection: 'row-reverse',
  },
  coverImage: {
    width: 100,
    height: 120,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 5,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  authorRTL: {
    paddingLeft: 20, // Adjusted padding for RTL
  },
  detailsContainer: {
    overflow: 'hidden',
  },
  details: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});

export default BookItem;
