import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const INITIAL_PROFILE = {
  name: 'Nethumi',
  email: 'nethumi.s@nsbm.ac.lk',
  points: 0,
};

function Avatar() {
  return (
    <View style={styles.avatarShell} accessibilityLabel="Profile avatar">
      <View style={styles.avatarHair} />
      <View style={styles.avatarFace}>
        <View style={styles.glasses}>
          <View style={styles.glassLens} />
          <View style={styles.glassBridge} />
          <View style={styles.glassLens} />
        </View>
        <View style={styles.avatarNose} />
        <View style={styles.avatarSmile} />
      </View>
      <View style={styles.avatarBody} />
      <View style={styles.avatarCheck}>
        <Ionicons name="checkmark" size={22} color="#ffffff" />
      </View>
    </View>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <View style={styles.valueRow}>
        {icon ? <Ionicons name={icon} size={15} color="#111111" style={styles.valueIcon} /> : null}
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function App() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [draft, setDraft] = useState(INITIAL_PROFILE);
  const [isEditorVisible, setEditorVisible] = useState(false);

  const openEditor = () => {
    setDraft(profile);
    setEditorVisible(true);
  };

  const closeEditor = () => setEditorVisible(false);

  const saveProfile = () => {
    const name = draft.name.trim() || INITIAL_PROFILE.name;
    const email = draft.email.trim() || INITIAL_PROFILE.email;
    setProfile({ ...profile, name, email });
    closeEditor();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.avatarWrap}>
            <Avatar />
          </View>
          <View style={styles.rule} />

          <View style={styles.details}>
            <DetailRow label="Name" value={profile.name} />
            <DetailRow label="Email" value={profile.email} icon="mail" />
            <DetailRow label="Points" value={String(profile.points)} icon="star" />
          </View>
        </View>

        <Pressable
          accessibilityLabel="Edit profile"
          accessibilityRole="button"
          onPress={openEditor}
          style={({ pressed }) => [styles.floatingButton, pressed && styles.pressed]}
        >
          <Ionicons name="add" size={26} color="#ffffff" />
        </Pressable>
      </View>

      <Modal visible={isEditorVisible} transparent animationType="slide" onRequestClose={closeEditor}>
        <Pressable style={styles.modalBackdrop} onPress={closeEditor}>
          <Pressable style={styles.editor} onPress={(event) => event.stopPropagation()}>
            <View style={styles.editorHandle} />
            <Text style={styles.editorTitle}>Edit profile</Text>

            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              autoCapitalize="words"
              onChangeText={(name) => setDraft({ ...draft, name })}
              placeholder="Your name"
              style={styles.input}
              value={draft.name}
            />

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(email) => setDraft({ ...draft, email })}
              placeholder="you@example.com"
              style={styles.input}
              value={draft.email}
            />

            <View style={styles.editorActions}>
              <Pressable onPress={closeEditor} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={saveProfile} style={styles.saveButton}>
                <Text style={styles.saveText}>Save</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#050505',
  },
  screen: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#050505',
    elevation: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
  },
  avatarWrap: {
    alignItems: 'center',
    paddingTop: 17,
    paddingBottom: 9,
  },
  avatarShell: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e6edf0',
    overflow: 'hidden',
    position: 'relative',
  },
  avatarHair: {
    position: 'absolute',
    width: 48,
    height: 43,
    left: 24,
    top: 11,
    borderRadius: 25,
    backgroundColor: '#292929',
  },
  avatarFace: {
    position: 'absolute',
    width: 38,
    height: 48,
    left: 29,
    top: 17,
    borderRadius: 20,
    backgroundColor: '#f0c8b5',
    borderWidth: 1,
    borderColor: '#222222',
  },
  glasses: {
    position: 'absolute',
    top: 17,
    left: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  glassLens: {
    width: 14,
    height: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#222222',
  },
  glassBridge: {
    width: 4,
    height: 2,
    backgroundColor: '#222222',
  },
  avatarNose: {
    position: 'absolute',
    top: 29,
    left: 18,
    width: 5,
    height: 7,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#8b5a50',
    transform: [{ rotate: '18deg' }],
  },
  avatarSmile: {
    position: 'absolute',
    bottom: 8,
    left: 14,
    width: 11,
    height: 5,
    borderBottomWidth: 1,
    borderColor: '#8b5a50',
    borderRadius: 7,
  },
  avatarBody: {
    position: 'absolute',
    width: 58,
    height: 27,
    left: 18,
    bottom: -7,
    borderRadius: 30,
    backgroundColor: '#525252',
    borderTopWidth: 2,
    borderColor: '#252525',
  },
  avatarCheck: {
    position: 'absolute',
    right: 7,
    bottom: 13,
    width: 29,
    height: 29,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#16d52b',
  },
  rule: {
    height: 1,
    backgroundColor: '#191919',
    marginTop: 0,
  },
  details: {
    paddingTop: 12,
  },
  detailRow: {
    marginBottom: 18,
  },
  detailLabel: {
    color: '#111111',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueIcon: {
    marginRight: 8,
  },
  detailValue: {
    color: '#3e3e3e',
    fontSize: 13,
  },
  floatingButton: {
    position: 'absolute',
    right: 17,
    bottom: 17,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: '#050505',
    elevation: 7,
    shadowColor: '#000000',
    shadowOpacity: 0.28,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  editor: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 28,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: '#ffffff',
  },
  editorHandle: {
    alignSelf: 'center',
    width: 38,
    height: 4,
    marginBottom: 18,
    borderRadius: 2,
    backgroundColor: '#d0d0d0',
  },
  editorTitle: {
    marginBottom: 20,
    color: '#111111',
    fontSize: 20,
    fontWeight: '700',
  },
  inputLabel: {
    marginBottom: 7,
    color: '#444444',
    fontSize: 12,
    fontWeight: '700',
  },
  input: {
    height: 46,
    marginBottom: 16,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: '#cfcfcf',
    borderRadius: 8,
    color: '#111111',
    fontSize: 14,
  },
  editorActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  cancelButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  cancelText: {
    color: '#444444',
    fontSize: 14,
    fontWeight: '700',
  },
  saveButton: {
    minWidth: 90,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#050505',
  },
  saveText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
