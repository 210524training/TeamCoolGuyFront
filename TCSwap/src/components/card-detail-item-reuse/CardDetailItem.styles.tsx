import { StyleSheet } from 'react-native';
import { YGOCARD_HEIGHT, YGOCARD_WIDTH } from '../../models/YGOCard';

const IMAGE_SCALE = 5;

const styles = StyleSheet.create ({
  container: {
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: "#d8d9d0",
  },
  cardImage: {
    width: YGOCARD_WIDTH*IMAGE_SCALE,
    height: YGOCARD_HEIGHT*IMAGE_SCALE,
    margin: 20,
  },
})

export default styles;