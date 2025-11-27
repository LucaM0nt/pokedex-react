import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTrainerProfile,
  updateTrainerProfile,
} from "../../store/userSlice";
import { REGIONS } from "../../constants/pokemonRegions";
import { TYPE_OPTIONS, TYPE_COLORS } from "../../constants/pokemonTypes";
import TrainerStatCard from "./TrainerStatCard";
import Card from "../common/Card";

export default function TrainerCard({ username }) {
  const dispatch = useDispatch();
  const profile = useSelector(selectTrainerProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const initials = (username || "U").slice(0, 1).toUpperCase();
  const avatarColor =
    TYPE_COLORS[profile.favoriteType] || "bg-blue-600 text-white";

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profile);
  };

  const handleSave = () => {
    dispatch(updateTrainerProfile(formData));
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <div className="pb-2 flex items-center gap-4">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow ${avatarColor}`}
        >
          {initials}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {username}
          </h1>
          <p className="text-gray-600">
            Ace Trainer •{" "}
            {isEditing ? (
              <select
                value={formData.region}
                onChange={(e) => handleChange("region", e.target.value)}
                className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
              >
                {REGIONS.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            ) : (
              `${profile.region} Region`
            )}
          </p>
        </div>
        <div className="text-right">
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="mb-2 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded cursor-pointer transition flex items-center gap-1 ml-auto"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
              </svg>
              Edit
            </button>
          )}
          <p className="text-sm text-gray-500">Trainer ID</p>
          <p className="font-semibold text-gray-800">#123456</p>
        </div>
      </div>

      {isEditing ? (
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <TrainerStatCard
              label="Lv."
              value={formData.level}
              isEditing={isEditing}
              inputType="number"
              onChange={(value) => handleChange("level", value)}
              inputProps={{ min: 1, max: 100 }}
            />
            <TrainerStatCard
              label="Badges"
              value={formData.badges}
              isEditing={isEditing}
              inputType="number"
              onChange={(value) => handleChange("badges", value)}
              inputProps={{ min: 0, max: 16 }}
            />
            <TrainerStatCard
              label="Since"
              value={formData.since}
              isEditing={isEditing}
              inputType="number"
              onChange={(value) => handleChange("since", value)}
              inputProps={{ min: 1996, max: new Date().getFullYear() }}
            />
            <TrainerStatCard
              label="Favorite Type"
              value={formData.favoriteType}
              isEditing={isEditing}
              inputType="select"
              options={TYPE_OPTIONS}
              onChange={(value) => handleChange("favoriteType", value)}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-800 font-medium transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700">
          <TrainerStatCard
            label="Lv."
            value={profile.level}
            isEditing={isEditing}
          />
          <TrainerStatCard
            label="Badges"
            value={profile.badges}
            isEditing={isEditing}
          />
          <TrainerStatCard
            label="Since"
            value={profile.since}
            isEditing={isEditing}
          />
          <TrainerStatCard
            label="Favorite Type"
            value={profile.favoriteType}
            isEditing={isEditing}
          />
        </div>
      )}
    </Card>
  );
}
