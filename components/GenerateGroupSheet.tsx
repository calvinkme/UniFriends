import { View, Text, Modal, Pressable, TextInput, ScrollView, ActivityIndicator, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { X, Sparkles, RefreshCw, UserPlus } from "lucide-react-native";
import { useState } from "react";
import { Colors } from "@/constants";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useConnectionStore } from "@/stores";
import type { ScoredProfile } from "@/services/matchingAlgorithm";
import type { GroupGenerationFilters } from "@/types";

type GenerateGroupSheetProps = {
  visible: boolean;
  onClose: () => void;
  onGroupCreated: (groupId: string) => void;
};

const GROUP_SIZES = [3, 4, 5, 6, 7, 8] as const;
const YEAR_OPTIONS: { value: 1 | 2 | 3 | 4; label: string }[] = [
  { value: 1, label: "1st" },
  { value: 2, label: "2nd" },
  { value: 3, label: "3rd" },
  { value: 4, label: "4th" },
];

export function GenerateGroupSheet({ visible, onClose, onGroupCreated }: GenerateGroupSheetProps) {
  const insets = useSafeAreaInsets();
  const { isGeneratingGroup, generateGroup } = useConnectionStore();

  const [selectedSize, setSelectedSize] = useState(4);
  const [step, setStep] = useState<"config" | "preview">("config");
  const [previewMembers, setPreviewMembers] = useState<ScoredProfile[]>([]);
  const [groupName, setGroupName] = useState("");
  const [createdGroupId, setCreatedGroupId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [sameUniversity, setSameUniversity] = useState(false);
  const [sameDegree, setSameDegree] = useState(false);
  const [selectedYears, setSelectedYears] = useState<(1 | 2 | 3 | 4)[]>([]);

  const emptySlots = step === "preview" ? Math.max(0, selectedSize - (previewMembers.length + 1)) : 0;

  function getFilters(): GroupGenerationFilters {
    return { sameUniversity, sameDegree, academicYears: selectedYears };
  }

  function toggleYear(year: 1 | 2 | 3 | 4) {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year],
    );
  }

  function handleClose() {
    setStep("config");
    setPreviewMembers([]);
    setGroupName("");
    setCreatedGroupId(null);
    setError(null);
    setSameUniversity(false);
    setSameDegree(false);
    setSelectedYears([]);
    onClose();
  }

  async function handleGenerate() {
    setError(null);
    const result = await generateGroup(selectedSize, getFilters());
    if (!result) {
      setError("No compatible users found with the selected requirements. Try adjusting your filters or group size.");
      return;
    }
    setPreviewMembers(result.members);
    setGroupName(result.group.name);
    setCreatedGroupId(result.group.id);
    setStep("preview");
  }

  async function handleRegenerate() {
    if (createdGroupId) {
      useConnectionStore.setState((state) => ({
        groups: state.groups.filter((g) => g.id !== createdGroupId),
        conversations: state.conversations.filter((c) => c.id !== `convo-group-${createdGroupId}`),
      }));
      setCreatedGroupId(null);
    }
    await handleGenerate();
  }

  function handleConfirm() {
    if (!createdGroupId) return;

    if (groupName.trim() && groupName !== useConnectionStore.getState().groups.find((g) => g.id === createdGroupId)?.name) {
      useConnectionStore.setState((state) => ({
        groups: state.groups.map((g) =>
          g.id === createdGroupId ? { ...g, name: groupName.trim() } : g,
        ),
        conversations: state.conversations.map((c) =>
          c.id === `convo-group-${createdGroupId}` ? { ...c, groupName: groupName.trim() } : c,
        ),
      }));
    }

    const groupId = createdGroupId;
    handleClose();
    onGroupCreated(groupId);
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={{ flex: 1, backgroundColor: "#00000044", justifyContent: "flex-end" }}>
        <View
          style={{
            backgroundColor: Colors.background,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: 20,
            paddingBottom: insets.bottom + 24,
            paddingHorizontal: 24,
            maxHeight: "90%",
          }}
        >
          {/* Header */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: Colors.primary.container,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles size={16} color={Colors.primary.DEFAULT} />
              </View>
              <Text style={{ fontFamily: "Manrope_800ExtraBold", fontSize: 20, color: Colors.onSurface.DEFAULT }}>
                {step === "config" ? "Auto-Generate Group" : "Your Group"}
              </Text>
            </View>
            <Pressable onPress={handleClose} hitSlop={8}>
              <X size={22} color={Colors.onSurface.variant} />
            </Pressable>
          </View>

          {step === "config" ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text
                style={{
                  fontFamily: "WorkSans_400Regular",
                  fontSize: 15,
                  lineHeight: 22,
                  color: Colors.onSurface.variant,
                  marginBottom: 24,
                }}
              >
                We'll find the most compatible people and create a group for you.
              </Text>

              {/* Size Picker */}
              <Text
                style={{
                  fontFamily: "WorkSans_600SemiBold",
                  fontSize: 12,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: Colors.onSurface.variant,
                  marginBottom: 12,
                }}
              >
                Group Size (including you)
              </Text>

              <View style={{ flexDirection: "row", gap: 10, marginBottom: 28 }}>
                {GROUP_SIZES.map((size) => {
                  const active = size === selectedSize;
                  return (
                    <Pressable
                      key={size}
                      onPress={() => setSelectedSize(size)}
                      style={{
                        flex: 1,
                        height: 48,
                        borderRadius: 12,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: active ? Colors.primary.DEFAULT : Colors.surface.containerHigh,
                        borderWidth: active ? 0 : 1,
                        borderColor: Colors.outline.variant + "4D",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Manrope_700Bold",
                          fontSize: 16,
                          color: active ? Colors.onPrimary.DEFAULT : Colors.onSurface.DEFAULT,
                        }}
                      >
                        {size}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Requirements */}
              <Text
                style={{
                  fontFamily: "WorkSans_600SemiBold",
                  fontSize: 12,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: Colors.onSurface.variant,
                  marginBottom: 16,
                }}
              >
                Requirements
              </Text>

              {/* Same University toggle */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: Colors.surface.containerHigh,
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.DEFAULT }}>
                  Same University
                </Text>
                <Switch
                  value={sameUniversity}
                  onValueChange={setSameUniversity}
                  trackColor={{ false: Colors.surface.container, true: Colors.primary.container }}
                  thumbColor={sameUniversity ? Colors.primary.DEFAULT : Colors.outline.variant}
                />
              </View>

              {/* Same Degree toggle */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: Colors.surface.containerHigh,
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  marginBottom: 16,
                }}
              >
                <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.DEFAULT }}>
                  Same Degree
                </Text>
                <Switch
                  value={sameDegree}
                  onValueChange={setSameDegree}
                  trackColor={{ false: Colors.surface.container, true: Colors.primary.container }}
                  thumbColor={sameDegree ? Colors.primary.DEFAULT : Colors.outline.variant}
                />
              </View>

              {/* Academic Year multi-select */}
              <Text
                style={{
                  fontFamily: "WorkSans_600SemiBold",
                  fontSize: 12,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: Colors.onSurface.variant,
                  marginBottom: 12,
                }}
              >
                Academic Year
              </Text>

              <View style={{ flexDirection: "row", gap: 10, marginBottom: 28 }}>
                {YEAR_OPTIONS.map(({ value, label }) => {
                  const active = selectedYears.includes(value);
                  return (
                    <Pressable
                      key={value}
                      onPress={() => toggleYear(value)}
                      style={{
                        flex: 1,
                        height: 48,
                        borderRadius: 12,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: active ? Colors.primary.DEFAULT : Colors.surface.containerHigh,
                        borderWidth: active ? 0 : 1,
                        borderColor: Colors.outline.variant + "4D",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Manrope_700Bold",
                          fontSize: 15,
                          color: active ? Colors.onPrimary.DEFAULT : Colors.onSurface.DEFAULT,
                        }}
                      >
                        {label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {error && (
                <View
                  style={{
                    backgroundColor: Colors.error.container,
                    borderRadius: 12,
                    padding: 14,
                    marginBottom: 16,
                  }}
                >
                  <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 14, color: Colors.onError.container }}>
                    {error}
                  </Text>
                </View>
              )}

              <Button
                label={isGeneratingGroup ? "Generating..." : "Generate Group"}
                onPress={handleGenerate}
                fullWidth
                disabled={isGeneratingGroup}
                icon={isGeneratingGroup ? <ActivityIndicator size="small" color={Colors.onPrimary.DEFAULT} /> : undefined}
              />
            </ScrollView>
          ) : (
            <View style={{ flex: 1 }}>
              {/* Editable Group Name */}
              <TextInput
                value={groupName}
                onChangeText={setGroupName}
                placeholder="Group name"
                placeholderTextColor={Colors.outline.DEFAULT}
                style={{
                  backgroundColor: Colors.surface.containerHigh,
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  fontFamily: "Manrope_700Bold",
                  fontSize: 16,
                  color: Colors.onSurface.DEFAULT,
                  marginBottom: 16,
                }}
              />

              {/* Partial group info banner */}
              {emptySlots > 0 && (
                <View
                  style={{
                    backgroundColor: Colors.secondary.container,
                    borderRadius: 12,
                    padding: 14,
                    marginBottom: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <UserPlus size={16} color={Colors.onSecondary?.container ?? Colors.onSurface.DEFAULT} />
                  <Text
                    style={{
                      fontFamily: "WorkSans_400Regular",
                      fontSize: 14,
                      color: Colors.onSecondary?.container ?? Colors.onSurface.DEFAULT,
                      flex: 1,
                    }}
                  >
                    {emptySlots} {emptySlots === 1 ? "slot is" : "slots are"} still open
                  </Text>
                </View>
              )}

              <Text
                style={{
                  fontFamily: "WorkSans_600SemiBold",
                  fontSize: 12,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: Colors.onSurface.variant,
                  marginBottom: 12,
                }}
              >
                Members ({previewMembers.length + 1}/{selectedSize})
              </Text>

              {/* Member List */}
              <ScrollView style={{ maxHeight: 320 }} showsVerticalScrollIndicator={false}>
                {/* Current user (you) */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    padding: 12,
                    borderRadius: 12,
                    backgroundColor: Colors.primary.DEFAULT + "0A",
                    marginBottom: 8,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: Colors.primary.container,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 14, color: Colors.onPrimary.container }}>
                      You
                    </Text>
                  </View>
                  <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.DEFAULT, flex: 1 }}>
                    You
                  </Text>
                  <Badge label="Joined" />
                </View>

                {previewMembers.map((member) => (
                  <View
                    key={member.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      padding: 12,
                      borderRadius: 12,
                      backgroundColor: Colors.surface.containerLow,
                      marginBottom: 8,
                    }}
                  >
                    <Avatar
                      uri={member.avatarUrl}
                      name={`${member.firstName} ${member.lastName}`}
                      size="sm"
                    />
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Text
                        style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.DEFAULT }}
                        numberOfLines={1}
                      >
                        {member.firstName} {member.lastName}
                      </Text>
                      <Text
                        style={{ fontFamily: "WorkSans_400Regular", fontSize: 12, color: Colors.onSurface.variant, marginTop: 2 }}
                        numberOfLines={1}
                      >
                        {member.degree}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
                      <Badge label="Pending" />
                      <Badge label={`${member.compatibilityScore}%`} />
                    </View>
                  </View>
                ))}

                {/* Empty slot placeholders */}
                {Array.from({ length: emptySlots }).map((_, i) => (
                  <View
                    key={`empty-${i}`}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      padding: 12,
                      borderRadius: 12,
                      borderWidth: 1.5,
                      borderStyle: "dashed",
                      borderColor: Colors.outline.variant + "66",
                      marginBottom: 8,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: Colors.surface.containerHigh,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <UserPlus size={16} color={Colors.outline.variant} />
                    </View>
                    <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 14, color: Colors.outline.variant }}>
                      Open Slot
                    </Text>
                  </View>
                ))}
              </ScrollView>

              {/* Actions */}
              <View style={{ gap: 10, marginTop: 16 }}>
                <Button
                  label="Create Group"
                  onPress={handleConfirm}
                  fullWidth
                  disabled={!groupName.trim()}
                />
                <Button
                  label={isGeneratingGroup ? "Regenerating..." : "Regenerate"}
                  onPress={handleRegenerate}
                  variant="surface"
                  fullWidth
                  disabled={isGeneratingGroup}
                  icon={isGeneratingGroup ? <ActivityIndicator size="small" color={Colors.onSurface.variant} /> : <RefreshCw size={16} color={Colors.onSurface.variant} />}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
