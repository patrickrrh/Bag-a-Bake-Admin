import { View, Text, Image, TouchableOpacity, ScrollView, Modal, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import BackButton from '@/components/BackButton'
import TextTitle3 from '@/components/texts/TextTitle3'
import TextTitle5 from '@/components/texts/TextTitle5'
import TextTitle5Bold from '@/components/texts/TextTitle5Bold'
import TextInformation from '@/components/texts/TextInformation'
import { formatDatewithtime } from '@/utils/commonFunctions'
import ImageView from "react-native-image-viewing";
import { Ionicons } from '@expo/vector-icons'
import { handleDownloadImage } from '@/utils/mediaUtils'
import Toast from 'react-native-toast-message'
import CustomButton from '@/components/CustomButton'
import ContactButton from '@/components/ContactButton'
import bakeryApi from '@/api/bakeryApi'
import { showToast } from '@/utils/toastUtils'
import ModalAction from '@/components/ModalAction'

const ActionBakery = () => {

    const { bakeryData } = useLocalSearchParams();
    const parsedBakeryData = bakeryData && typeof bakeryData === 'string' ? JSON.parse(bakeryData) : {}

    const [isPreviewQRIS, setIsPreviewQRIS] = useState(false)
    const [isPreviewHalalCertificate, setIsPreviewHalalCertificate] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDeactivateModal, setIsDeactivateModal] = useState(false)
    const [isRejectModal, setIsRejectModal] = useState(false)

    const [reason, setReason] = useState('');
    const [reasonError, setReasonError] = useState('');

    const handleUpdateBakeryStatusApi = async (isActive: number, status: string, message: string) => {
        setIsSubmitting(true)

        try {
            if (isActive === 2 && reason === '') {
                setReasonError('Alasan wajib diisi');
                return;
            }

            const res = await bakeryApi().updateBakeryStatus({
                bakeryId: parsedBakeryData.bakeryId,
                isActive: isActive,
                email: parsedBakeryData.user.email,
                userName: parsedBakeryData.user.userName,
                status: status,
                message: message
            })

            if (res.status === 200) {
                setIsDeactivateModal(false);
                router.back();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleDeleteBakeryApi = async (status: string, message: string) => {
        setIsSubmitting(true)
        try {

            if (reason === '') {
                setReasonError('Alasan wajib diisi');
                return
            }

            const res = await bakeryApi().deleteBakery({
                bakeryId: parsedBakeryData.bakeryId,
                email: parsedBakeryData.user.email,
                userName: parsedBakeryData.user.userName,
                status: status,
                message: message
            });

            if (res.status === 200) {
                setIsRejectModal(false);
                router.back();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        setReason('');
        setReasonError('');
    }, [isDeactivateModal, isRejectModal]);

    return (
        <SafeAreaView className="flex-1 bg-background py-5 px-8">
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <Toast topOffset={50} />
            </View>

            <View className='mb-5'>
                <BackButton />
            </View>

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View className='space-y-3'>
                    <View>
                        <TextTitle3 label='Data Pengguna' />
                        <TextInformation title='Nama' value={parsedBakeryData.user.userName} />
                        <TextInformation title='Email' value={parsedBakeryData.user.email} />
                        <TextInformation title='Nomor Telepon' value={parsedBakeryData.user.userPhoneNumber} />
                        <TextInformation title='Tanggal Registrasi' value={formatDatewithtime(parsedBakeryData.user.signUpDate)} />
                    </View>

                    <View style={{ height: 1, backgroundColor: "#e0e0e0", marginVertical: 8 }} />

                    <View>
                        <TextTitle3 label='Data Bakery' />
                        <TextInformation title='Nama Bakery' value={parsedBakeryData.bakeryName} />
                        <TextInformation title='Nomor Telepon Bakery' value={parsedBakeryData.bakeryPhoneNumber} />
                        <TextInformation title='Alamat' value={parsedBakeryData.bakeryAddress} />
                        <TextInformation title='Jam Operasional' value={`${parsedBakeryData.openingTime} - ${parsedBakeryData.closingTime}`} />
                        <TextInformation title='Deskripsi' value={parsedBakeryData.bakeryDescription} />
                        <TextInformation title='Status Halal' value={parsedBakeryData.isHalal === 1 ? 'Ya' : 'Tidak'} />
                        {
                            parsedBakeryData.isHalal === 1 && (
                                <View className='flex-row mt-2'>
                                <View className='mr-1'>
                                    <TextTitle5Bold label={`Sertifikat Halal:`} />
                                </View>
                                <View className='flex-row items-end'>
                                    <TouchableOpacity onPress={() => setIsPreviewHalalCertificate(true)}>
                                        <Image
                                            source={{ uri: `${process.env.EXPO_PUBLIC_LOCAL_SERVER}/images/bakery-halal-certificate/${parsedBakeryData.halalCertificate}` }}
                                            className='ml-2 mt-1 w-28 h-28'
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDownloadImage('images/bakery-halal-certificate', parsedBakeryData.halalCertificate)} className='ml-1'>
                                        <Ionicons name="download-outline" size={18} color="gray" />
                                    </TouchableOpacity>
                                </View>
                                <ImageView
                                    images={[{ uri: `${process.env.EXPO_PUBLIC_LOCAL_SERVER}/images/bakery-halal-certificate/${parsedBakeryData.halalCertificate}` }]}
                                    imageIndex={0}
                                    visible={isPreviewHalalCertificate}
                                    onRequestClose={() => setIsPreviewHalalCertificate(false)}
                                />
                            </View>
                            )
                        }
                    </View>

                    <View style={{ height: 1, backgroundColor: "#e0e0e0", marginVertical: 8 }} />

                    <View>
                        <TextTitle3 label='Metode Pembayaran' />
                        {
                            parsedBakeryData.payment && parsedBakeryData.payment.length > 0 && (
                                parsedBakeryData.payment.map((payment: any, index: number) => (
                                    <View key={index} className='mt-3'>
                                        <TextInformation title={`Metode ${index + 1}`} value={payment.paymentService} />
                                        {
                                            payment.paymentMethod === 'QRIS' ? (
                                                <View className='flex-row mt-2'>
                                                    <View className='mr-1'>
                                                        <TextTitle5Bold label={`Detail Pembayaran:`} />
                                                    </View>
                                                    <View className='flex-row items-end'>
                                                        <TouchableOpacity onPress={() => setIsPreviewQRIS(true)}>
                                                            <Image
                                                                source={{ uri: `${process.env.EXPO_PUBLIC_LOCAL_SERVER}/images/bakery-qris/${payment.paymentDetail}` }}
                                                                className='ml-2 mt-1 w-28 h-28'
                                                            />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => handleDownloadImage('images/bakery-qris', payment.paymentDetail)} className='ml-1'>
                                                            <Ionicons name="download-outline" size={18} color="gray" />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <ImageView
                                                        images={[{ uri: `${process.env.EXPO_PUBLIC_LOCAL_SERVER}/images/bakery-qris/${payment.paymentDetail}` }]}
                                                        imageIndex={0}
                                                        visible={isPreviewQRIS}
                                                        onRequestClose={() => setIsPreviewQRIS(false)}
                                                    />
                                                </View>
                                            ) : (
                                                <TextInformation title={`Detail Pembayaran`} value={payment.paymentDetail} />
                                            )
                                        }
                                    </View>
                                ))
                            )
                        }
                    </View>
                </View>
            </ScrollView>

            <View style={{ paddingTop: 20, backgroundColor: '#FEFAF9' }}>
                {
                    parsedBakeryData.isActive === 0 ? (
                        <View>
                            <CustomButton
                                label='Setujui'
                                handlePress={() => handleUpdateBakeryStatusApi(1,
                                    'Akun Bakery Anda Telah Diaktifkan', 'Silahkan mengakses aplikasi menggunakan email dan kata sandi Anda.')}
                                isLoading={isSubmitting}
                            />
                            <ContactButton
                                label='Tolak'
                                handlePress={() => setIsRejectModal(true)}
                                buttonStyles='mt-3'
                                isLoading={isSubmitting}
                            />
                        </View>
                    ) : parsedBakeryData.isActive === 1 ? (
                        <View>
                            <ContactButton
                                label='Nonaktifkan'
                                handlePress={() => setIsDeactivateModal(true)}
                                buttonStyles='mt-3'
                                isLoading={isSubmitting}
                            />
                        </View>
                    ) : parsedBakeryData.isActive === 2 && (
                        <View>
                            <CustomButton
                                label='Aktifkan'
                                handlePress={() => handleUpdateBakeryStatusApi(1,
                                    'Akun Bakery Anda Telah Diaktifkan', 'Silahkan mengakses aplikasi menggunakan email dan kata sandi Anda.')}
                                isLoading={isSubmitting}
                            />
                        </View>
                    )
                }
            </View>

            <ModalAction
                modalVisible={isDeactivateModal}
                setModalVisible={setIsDeactivateModal}
                title='Apakah Anda Yakin Ingin Menonaktifkan Bakery Ini?'
                reason={reason}
                reasonError={reasonError}
                onChangeText={(text) => {
                    setReason(text);
                    setReasonError('');
                }}
                primaryButtonLabel='Batal'
                secondaryButtonLabel='Nonaktifkan'
                onPrimaryAction={() => setIsDeactivateModal(false)}
                onSecondaryAction={() => handleUpdateBakeryStatusApi(2, 'Maaf, Akun Bakery Anda Telah Dinonaktifkan', reason)}
            />

            <ModalAction
                modalVisible={isRejectModal}
                setModalVisible={setIsRejectModal}
                title='Apakah Anda Yakin Ingin Menolak Registrasi Bakery Ini?'
                reason={reason}
                reasonError={reasonError}
                onChangeText={(text) => {
                    setReason(text);
                    setReasonError('');
                }}
                primaryButtonLabel='Batal'
                secondaryButtonLabel='Tolak'
                onPrimaryAction={() => setIsRejectModal(false)}
                onSecondaryAction={() => handleDeleteBakeryApi('Maaf, Registrasi Bakery Ditolak', reason)}
            />

        </SafeAreaView>
    );
}

export default ActionBakery