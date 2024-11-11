import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 10,
    gap: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3498db',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 3,
    backgroundColor: '#F3F4F6',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 35,
    borderWidth: 1,
    borderColor: '#ddd',
    // elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'transparent',
    paddingLeft: 10,
    height: '100%',
  },
  searchIconContainer: {
    paddingLeft: 10,
  },
  cartContainer: {
    position: 'relative', 
  },
  cartItemCount: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  itemCountText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
