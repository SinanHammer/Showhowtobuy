import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Phone, MapPin, CreditCard, ShoppingBag, Heart, Settings, LogOut, Camera, Edit3, Save, X } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/lib/supabase'

interface UserProfile {
  name: string
  email: string
  phone: string
  avatar: string
  birthday: string
  gender: 'male' | 'female' | 'other'
  address: string
  bio: string
}

export default function Profile() {
  const { user, logout } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

const menuItems = [
  {
    icon: ShoppingBag,
    label: '我的订单',
    href: '/orders',
    description: '查看订单状态和历史记录'
  },
  {
    icon: Heart,
    label: '我的收藏',
    href: '/favorites',
    description: '管理收藏的商品'
  },
  {
    icon: MapPin,
    label: '收货地址',
    href: '/addresses',
    description: '管理收货地址'
  },
  {
    icon: CreditCard,
    label: '支付方式',
    href: '/payment-methods',
    description: '管理支付卡片'
  },
  {
    icon: Settings,
    label: '账户设置',
    href: '/settings',
    description: '修改密码和安全设置'
  }
]

  useEffect(() => {
    if (user) {
      fetchUserProfile()
    }
  }, [user])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (userError) throw userError

      const userProfile: UserProfile = {
        name: userData.name || userData.email?.split('@')[0] || '用户',
        email: userData.email || '',
        phone: userData.phone || '',
        avatar: userData.avatar || `https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20professional%20avatar%20minimalist%20style%20portrait%20photography&image_size=square`,
        birthday: userData.birthday || '',
        gender: userData.gender || 'other',
        address: userData.address || '',
        bio: userData.bio || '时尚爱好者'
      }

      setProfile(userProfile)
      setEditedProfile(userProfile)
    } catch (error) {
      console.error('获取用户信息失败:', error)
      toast.error('获取用户信息失败')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditedProfile(profile)
  }

  const handleSave = async () => {
    if (!editedProfile || !user) return

    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: editedProfile.name,
          phone: editedProfile.phone,
          birthday: editedProfile.birthday,
          gender: editedProfile.gender,
          address: editedProfile.address,
          bio: editedProfile.bio
        })
        .eq('id', user.id)

      if (error) throw error

      setProfile(editedProfile)
      setIsEditing(false)
      toast.success('个人信息更新成功！')
    } catch (error) {
      console.error('更新用户信息失败:', error)
      toast.error('更新用户信息失败')
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedProfile(profile)
  }

  const handleAvatarChange = async () => {
    // 创建文件输入元素
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file || !user) return

      try {
        // 上传头像到Supabase存储
        const fileName = `${user.id}/avatar-${Date.now()}.${file.name.split('.').pop()}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, file)

        if (uploadError) throw uploadError

        // 获取头像URL
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName)

        // 更新用户头像
        const { error: updateError } = await supabase
          .from('users')
          .update({ avatar: publicUrl })
          .eq('id', user.id)

        if (updateError) throw updateError

        // 更新本地状态
        if (editedProfile) {
          setEditedProfile({ ...editedProfile, avatar: publicUrl })
        }
        if (profile) {
          setProfile({ ...profile, avatar: publicUrl })
        }

        toast.success('头像更新成功！')
      } catch (error) {
        console.error('头像上传失败:', error)
        toast.error('头像上传失败')
      }
    }

    input.click()
  }

  const handleLogout = async () => {
    await logout()
    toast.success('已退出登录')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-gray/5 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
              <p className="text-primary-gray">加载中...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-primary-gray/5 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-primary-black mb-4">请先登录</h2>
              <p className="text-primary-gray mb-6">登录后查看个人中心</p>
              <Link
                to="/auth/login"
                className="inline-block bg-primary-black text-white px-6 py-2 rounded-md hover:bg-primary-gray transition-colors"
              >
                立即登录
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="min-h-screen bg-primary-gray/5 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary-black mb-8">个人中心</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧：个人信息 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary-gray/20"
                    />
                    {isEditing && (
                      <button
                        onClick={handleAvatarChange}
                        className="absolute bottom-0 right-0 bg-accent-blue text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-primary-black mt-4">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile?.name || ''}
                        onChange={(e) => setEditedProfile(editedProfile ? {...editedProfile, name: e.target.value} : null)}
                        className="w-full text-center border border-primary-gray/30 rounded px-3 py-2 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
                      />
                    ) : (
                      profile.name
                    )}
                  </h2>
                  <p className="text-primary-gray mt-1">{profile.bio}</p>
                </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-gray mb-1">
                    邮箱地址
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile?.email || ''}
                      onChange={(e) => setEditedProfile(editedProfile ? {...editedProfile, email: e.target.value} : null)}
                      className="w-full border border-primary-gray/30 rounded px-3 py-2 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-primary-black">
                      <Mail className="w-4 h-4 text-primary-gray" />
                      <span>{profile.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-gray mb-1">
                    手机号码
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile?.phone || ''}
                      onChange={(e) => setEditedProfile(editedProfile ? {...editedProfile, phone: e.target.value} : null)}
                      className="w-full border border-primary-gray/30 rounded px-3 py-2 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-primary-black">
                      <Phone className="w-4 h-4 text-primary-gray" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-gray mb-1">
                    生日
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editedProfile?.birthday || ''}
                      onChange={(e) => setEditedProfile(editedProfile ? {...editedProfile, birthday: e.target.value} : null)}
                      className="w-full border border-primary-gray/30 rounded px-3 py-2 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
                    />
                  ) : (
                    <p className="text-primary-black">{profile.birthday}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-gray mb-1">
                    性别
                  </label>
                  {isEditing ? (
                    <select
                      value={editedProfile?.gender || 'other'}
                      onChange={(e) => setEditedProfile(editedProfile ? {...editedProfile, gender: e.target.value as 'male' | 'female' | 'other'} : null)}
                      className="w-full border border-primary-gray/30 rounded px-3 py-2 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
                    >
                      <option value="female">女</option>
                      <option value="male">男</option>
                      <option value="other">其他</option>
                    </select>
                  ) : (
                    <p className="text-primary-black">
                      {profile.gender === 'female' ? '女' : profile.gender === 'male' ? '男' : '其他'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-gray mb-1">
                    收货地址
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editedProfile?.address || ''}
                      onChange={(e) => setEditedProfile(editedProfile ? {...editedProfile, address: e.target.value} : null)}
                      className="w-full border border-primary-gray/30 rounded px-3 py-2 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none resize-none"
                      rows={3}
                    />
                  ) : (
                    <div className="flex items-start gap-2 text-primary-black">
                      <MapPin className="w-4 h-4 text-primary-gray mt-1" />
                      <span>{profile.address}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-gray mb-1">
                    个人简介
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editedProfile?.bio || ''}
                      onChange={(e) => setEditedProfile(editedProfile ? {...editedProfile, bio: e.target.value} : null)}
                      className="w-full border border-primary-gray/30 rounded px-3 py-2 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none resize-none"
                      rows={3}
                    />
                  ) : (
                    <p className="text-primary-black">{profile.bio}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex-1 flex items-center justify-center gap-2 bg-accent-blue text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      保存
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary-gray text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      取消
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center justify-center gap-2 bg-primary-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    编辑资料
                  </button>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="w-full mt-3 flex items-center justify-center gap-2 border border-red-500 text-red-500 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                退出登录
              </button>
            </div>
          </div>
        </div>

        {/* 右侧：功能菜单 */}
        <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={index}
                    to={item.href}
                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-primary-gray/10 rounded-lg group-hover:bg-accent-blue/10 transition-colors">
                            <Icon className="w-5 h-5 text-primary-black group-hover:text-accent-blue transition-colors" />
                          </div>
                          <h3 className="text-lg font-semibold text-primary-black">
                            {item.label}
                          </h3>
                        </div>
                        <p className="text-sm text-primary-gray">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-primary-gray group-hover:text-accent-blue transition-colors">
                        →
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* 快捷操作 */}
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-primary-black mb-4">快捷操作</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  to="/orders?status=pending"
                  className="text-center p-4 border border-primary-gray/30 rounded-lg hover:border-accent-blue hover:bg-accent-blue/5 transition-colors"
                >
                  <div className="text-2xl font-bold text-accent-blue mb-1">3</div>
                  <div className="text-sm text-primary-gray">待确认订单</div>
                </Link>
                <Link
                  to="/orders?status=shipped"
                  className="text-center p-4 border border-primary-gray/30 rounded-lg hover:border-accent-blue hover:bg-accent-blue/5 transition-colors"
                >
                  <div className="text-2xl font-bold text-green-600 mb-1">2</div>
                  <div className="text-sm text-primary-gray">待收货订单</div>
                </Link>
                <Link
                  to="/favorites"
                  className="text-center p-4 border border-primary-gray/30 rounded-lg hover:border-accent-blue hover:bg-accent-blue/5 transition-colors"
                >
                  <div className="text-2xl font-bold text-pink-500 mb-1">12</div>
                  <div className="text-sm text-primary-gray">收藏商品</div>
                </Link>
                <Link
                  to="/addresses"
                  className="text-center p-4 border border-primary-gray/30 rounded-lg hover:border-accent-blue hover:bg-accent-blue/5 transition-colors"
                >
                  <div className="text-2xl font-bold text-purple-600 mb-1">2</div>
                  <div className="text-sm text-primary-gray">收货地址</div>
                </Link>
              </div>
            </div>

            {/* 最近订单 */}
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary-black">最近订单</h3>
                <Link
                  to="/orders"
                  className="text-accent-blue hover:underline text-sm"
                >
                  查看全部
                </Link>
              </div>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border border-primary-gray/20 rounded-lg hover:border-accent-blue transition-colors">
                    <img
                      src={`https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20elegant%20women%20dress%20minimalist%20style%20fashion%20photography&image_size=square`}
                      alt="商品"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-primary-black">时尚连衣裙</h4>
                      <p className="text-sm text-primary-gray">订单号：ORD2024120100{i}</p>
                      <p className="text-sm text-primary-gray">2024-12-0{i}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary-black">¥299.00</p>
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                        已送达
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}