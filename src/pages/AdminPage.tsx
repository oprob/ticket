import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { PlusCircle, Edit, Trash2, Save, X } from 'lucide-react';

interface Match {
  id: string;
  teams: string;
  team1: string;
  team2: string;
  team1_logo: string;
  team2_logo: string;
  date: string;
  time: string;
  stadium: string;
  location: string;
  sport: string;
  trending: boolean;
  sold_out: boolean;
  duration: string;
  ticket_info: string;
}

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const emptyMatch: Match = {
    id: '',
    teams: '',
    team1: '',
    team2: '',
    team1_logo: '',
    team2_logo: '',
    date: '',
    time: '',
    stadium: '',
    location: '',
    sport: 'football',
    trending: false,
    sold_out: false,
    duration: '',
    ticket_info: ''
  };

  useEffect(() => {
    checkAdmin();
    fetchMatches();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/');
      return;
    }

    // Check if user is admin in profiles table
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!profile?.is_admin) {
      navigate('/');
      return;
    }

    setIsAdmin(true);
  };

  const fetchMatches = async () => {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching matches:', error);
      return;
    }

    setMatches(data || []);
    setIsLoading(false);
  };

  const handleSave = async (match: Match) => {
    if (!match.team1 || !match.team2) {
      alert('Team names are required');
      return;
    }

    // Set the teams field
    const matchData = {
      ...match,
      teams: `${match.team1} vs ${match.team2}`
    };
    
    const { id, ...dataToSave } = matchData;
    
    if (isAddingNew) {
      const { error } = await supabase
        .from('matches')
        .insert([dataToSave]);

      if (error) {
        console.error('Error adding match:', error);
        alert('Error adding match');
        return;
      }
    } else {
      const { error } = await supabase
        .from('matches')
        .update(dataToSave)
        .eq('id', id);

      if (error) {
        console.error('Error updating match:', error);
        alert('Error updating match');
        return;
      }
    }

    setEditingMatch(null);
    setIsAddingNew(false);
    fetchMatches();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this match?')) return;

    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting match:', error);
      alert('Error deleting match');
      return;
    }

    fetchMatches();
  };

  if (!isAdmin) return null;
  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Match Management</h1>
          <button
            onClick={() => {
              setEditingMatch(emptyMatch);
              setIsAddingNew(true);
            }}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <PlusCircle size={20} className="mr-2" />
            Add New Match
          </button>
        </div>

        {(editingMatch || isAddingNew) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {isAddingNew ? 'Add New Match' : 'Edit Match'}
                </h2>
                <button
                  onClick={() => {
                    setEditingMatch(null);
                    setIsAddingNew(false);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Team 1</label>
                  <input
                    type="text"
                    value={editingMatch.team1}
                    onChange={(e) => setEditingMatch({ ...editingMatch, team1: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Team 2</label>
                  <input
                    type="text"
                    value={editingMatch.team2}
                    onChange={(e) => setEditingMatch({ ...editingMatch, team2: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Team 1 Logo URL</label>
                  <input
                    type="text"
                    value={editingMatch.team1_logo}
                    onChange={(e) => setEditingMatch({ ...editingMatch, team1_logo: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Team 2 Logo URL</label>
                  <input
                    type="text"
                    value={editingMatch.team2_logo}
                    onChange={(e) => setEditingMatch({ ...editingMatch, team2_logo: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="datetime-local"
                    value={editingMatch.date}
                    onChange={(e) => setEditingMatch({ ...editingMatch, date: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="text"
                    value={editingMatch.time}
                    onChange={(e) => setEditingMatch({ ...editingMatch, time: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-3 py-2"
                    placeholder="e.g., 8:00 PM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Stadium</label>
                  <input
                    type="text"
                    value={editingMatch.stadium}
                    onChange={(e) => setEditingMatch({ ...editingMatch, stadium: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={editingMatch.location}
                    onChange={(e) => setEditingMatch({ ...editingMatch, location: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Sport</label>
                  <select
                    value={editingMatch.sport}
                    onChange={(e) => setEditingMatch({ ...editingMatch, sport: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-3 py-2"
                  >
                    <option value="football">Football</option>
                    <option value="cricket">Cricket</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingMatch.duration}
                    onChange={(e) => setEditingMatch({ ...editingMatch, duration: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-3 py-2"
                    placeholder="e.g., 90 minutes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Ticket Info</label>
                  <input
                    type="text"
                    value={editingMatch.ticket_info}
                    onChange={(e) => setEditingMatch({ ...editingMatch, ticket_info: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-3 py-2"
                    placeholder="e.g., Available"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingMatch.trending}
                      onChange={(e) => setEditingMatch({ ...editingMatch, trending: e.target.checked })}
                      className="mr-2"
                    />
                    Trending
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingMatch.sold_out}
                      onChange={(e) => setEditingMatch({ ...editingMatch, sold_out: e.target.checked })}
                      className="mr-2"
                    />
                    Sold Out
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleSave(editingMatch)}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Save size={20} className="mr-2" />
                  Save Match
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-3 text-left">Teams</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Sport</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match.id} className="border-t border-gray-700">
                  <td className="px-4 py-3">{match.teams}</td>
                  <td className="px-4 py-3">{new Date(match.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 capitalize">{match.sport}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      {match.trending && (
                        <span className="px-2 py-1 text-xs bg-yellow-500 text-yellow-900 rounded-full">
                          Trending
                        </span>
                      )}
                      {match.sold_out && (
                        <span className="px-2 py-1 text-xs bg-red-500 text-red-900 rounded-full">
                          Sold Out
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => {
                          setEditingMatch(match);
                          setIsAddingNew(false);
                        }}
                        className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(match.id)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;