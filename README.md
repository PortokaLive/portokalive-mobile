# iShow-RN
![img](https://raw.githubusercontent.com/NodeMedia/iShow-RN/master/1519740855033.gif)

## How to run
### 1. install RN dependencies
```
yarn install
```

### 2. install iOS SDK
```
cd ios
pod install
```

### 3. run
```
react-native run-ios
```
or

```
react-native run-android
```

## Issue
If your console outputs the following error.
```
Loading dependency graph, done.
error: bundling failed: Error: While resolving module `react-native-vector-icons/Ionicons`, the Haste package `react-native-vector-icons` was found. However the module `Ionicons` could not be found within the package. Indeed, none of these files exist:
```

Do this step.
```
rm node_modules/react-native/local-cli/core/__fixtures__/files/package.json
```
